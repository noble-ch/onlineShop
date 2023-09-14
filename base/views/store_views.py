# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# from base.models import StoreReview
from base.serializers import StoreReviewSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createStoreReview(request):
    user = request.user
    data = request.data

    serializer = StoreReviewSerializer(data=data)

    if serializer.is_valid():
        serializer.save(user=user, name=user.first_name)
        return Response({'message': 'Review Added'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
