from django.urls import path
from base.views import store_views as views
urlpatterns = [
    path('reviews/', views.createStoreReview, name="create-store-review"),
    path('reviews/list/', views.listStoreReviews, name='list-store-reviews'),
]
