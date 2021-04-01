from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.models import Branch


class BranchSerializer(ModelSerializer):
    bank_name = serializers.CharField(label="bank", source="bank.name")
    bank_id = serializers.IntegerField(label="bank", source="bank.id")

    class Meta:
        model = Branch
        exclude = ('bank', )