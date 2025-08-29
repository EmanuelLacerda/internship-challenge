from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

import json

URL = reverse("lcm_interval_calculation")


class OnlyPostMethodAllowedTestCase(APITestCase):
    def test_if_get_method_is_allowed(self):
        response = self.client.get(URL)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_if_post_method_is_allowed(self):
        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.post(URL, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_if_put_method_is_allowed(self):
        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.put(URL, data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_if_delete_method_is_allowed(self):
        response = self.client.delete(URL)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

class CalculationAccuracyTestCase(APITestCase):
    def test_calculation_result(self):
        """
        This test is used to verify that the LCM Interval Calculation is working correctly.
        """
        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.post(URL, json.dumps(data), content_type='application/json')

        self.assertEqual(response.data["lcm"], 2520)


class InvalidDataTestCase(APITestCase):
    """
    Those tests bellow are used to verify that the API is identifying that a invalid attribute(s) was(were) passed and that the response was passed correctly in those cases.
    """
    def _common_assert(self, response, error):
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(error["name"] in response.data)
        self.assertEqual(response.data[error["name"]][0], error["message"])

    def test_sends_non_integer_to_the_request(self):
        data = {
            "first_number": 1,
            "last_number": "a"
        }
        response = self.client.post(URL, json.dumps(data), content_type='application/json')

        self._common_assert(response, {"name": "last_number", "message": "Este número deve ser um inteiro."})
    
    def test_sends_first_greater_than_last_to_the_request(self):
        data = {
            "first_number": 10,
            "last_number": 1
        }
        response = self.client.post(URL, json.dumps(data), content_type='application/json')

        self._common_assert(response, {"name": "first_number", "message": "O primeiro elemento do intervalo deve ser menor do que o último."})
    
    def test_sends_interval_less_than_one_to_the_request(self):
        data = {
            "first_number": 10,
            "last_number": 10
        }
        response = self.client.post(URL, json.dumps(data), content_type='application/json')

        self._common_assert(response, {"name": "completed_interval", "message": "O tamanho do intervalo deve ser maior que 0."})

