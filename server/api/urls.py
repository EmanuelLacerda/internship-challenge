from django.urls import path
from .views import LCMIntervalCalculationAPIView


urlpatterns = [
    path('lcm-interval-calculation/', LCMIntervalCalculationAPIView.as_view(), name='lcm_interval_calculation'),
]