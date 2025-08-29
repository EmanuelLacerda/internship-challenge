from rest_framework import serializers

from django.core.validators import MaxValueValidator


def is_multiple_of_all(number: int, list: list[int]) -> bool:
    for element in list:
        if number % element != 0:
            return False
    return True

def calculate_LCM_of_interval(first: int, last: int) -> int:
    # Least multiple common = LCM
    interval_list: list[int] = list(range(first, last+1))

    n: int = 1
    candidate: int = last

    while True:
        if is_multiple_of_all(candidate, interval_list):
            return candidate
        
        n += 1
        candidate = last*n

class LCMIntervalCalculationSerializer(serializers.Serializer):
    first_number=serializers.IntegerField(validators=[MaxValueValidator(10000)],error_messages={
        "invalid": "Este número deve ser um inteiro."})
    last_number=serializers.IntegerField(validators=[MaxValueValidator(10000)],error_messages={
        "invalid": "Este número deve ser um inteiro."})
    lcm=serializers.IntegerField(read_only=True)

    class Meta:
        fields=['first_number', 'last_number']
    
    def validate(self, attrs):
        first=attrs.get('first_number')
        last=attrs.get('last_number')

        if first > last:
            raise serializers.ValidationError({"first_number": "O primeiro elemento do intervalo deve ser menor do que o último."})
        elif last - first <= 0:
            raise serializers.ValidationError({"completed_interval": "O tamanho do intervalo deve ser maior que 0."})
        
        lcm =  calculate_LCM_of_interval(first, last)
        
        return {
            'first_number': first,
            'last_number': last,
            'lcm':lcm
        }