from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LCMIntervalCalculationSerializer

class LCMIntervalCalculationAPIView(APIView):
    
    def post(self, request):
        serializer = LCMIntervalCalculationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)