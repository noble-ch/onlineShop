# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from base.models import StoreReview
from base.serializers import StoreReviewSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createStoreReview(request):
    user = request.user
    data = request.data

    # Create the review object without validation
    review = StoreReview.objects.create(
        user=user,
        name=user.first_name,
        rating=data['rating'],
        comment=data['comment'],
    )

    return Response({'message': 'Review Added'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def listStoreReviews(request):
    # Retrieve all store reviews
    store_reviews = StoreReview.objects.all()

    # Serialize the reviews
    serializer = StoreReviewSerializer(store_reviews, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
