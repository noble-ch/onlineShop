from django.urls import path
from base.views import order_views as views


urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    # path('api/generate-chapa-payment/',
    #      views.order_views.generate_chapa_payment, name='generate_chapa_payment'),
    path('myorders/', views.getMyOrders, name='myorders'),


    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/recieve/', views.updateOrderToRecieved, name='order-recieved'),


    path('<str:pk>/', views.getOrderById, name='user-order'),

    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/initializePayment/',
         views.initialize_payment, name='init-pay'),

    # URLs for backorders
    path('backorders/', views.listBackorders, name='list-backorders'),
    path('backorders/<str:pk>/', views.getBackorderById, name='backorder-detail'),
    path('backorders/<str:pk>/fulfill/',
         views.fulfillBackorder, name='fulfill-backorder'),

    # URLs for preorders
    # path('preorders/', views.listPreorders, name='list-preorders'),
    # path('preorders/<str:pk>/', views.getPreorderById, name='preorder-detail'),
    # path('preorders/<str:pk>/fulfill/',
    #      views.fulfillPreorder, name='fulfill-preorder'),
]
