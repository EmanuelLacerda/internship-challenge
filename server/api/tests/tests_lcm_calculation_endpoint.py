from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

import json


class OnlyPostMethodAllowedTestCase(APITestCase):
    def test_if_get_method_is_allowed(self):
        url = reverse("lcm_interval_calculation")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 405)
    
    def test_if_post_method_is_allowed(self):
        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
    
    def test_if_put_method_is_allowed(self):
        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.put(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 405)
    
    def test_if_delete_method_is_allowed(self):
        url = reverse("lcm_interval_calculation")

        response = self.client.delete(url)
        self.assertEqual(response.status_code, 405)

class CalculationAccuracyTestCase(APITestCase):
    def test_calculation_result(self):
        """
        This test is used to verify that the LCM Interval Calculation is working correctly.
        """

        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 1,
            "last_number": 10
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.data["lcm"], 2520)


class InvalidDataTestCase(APITestCase):
    """
    Those tests bellow are used to verify that the API is identifying that a invalid attribute(s) was(were) passed and that the response was passed correctly in those cases.
    """

    def test_sends_non_integer_to_the_request(self):
        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 1,
            "last_number": "a"
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertTrue("last_number" in response.data)
        self.assertEqual(response.data["last_number"][0], "Este número deve ser um inteiro.")
    
    def test_sends_first_greater_than_last_to_the_request(self):
        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 10,
            "last_number": 1
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertTrue("first_number" in response.data)
        self.assertEqual(response.data["first_number"][0], "O primeiro elemento do intervalo deve ser menor do que o último.")
    
    def test_sends_interval_less_than_one_to_the_request(self):
        url = reverse("lcm_interval_calculation")

        data = {
            "first_number": 10,
            "last_number": 10
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertTrue("completed_interval" in response.data)
        self.assertEqual(response.data["completed_interval"][0], "O tamanho do intervalo deve ser maior que 0.")

