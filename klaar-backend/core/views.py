from rest_framework import generics
from rest_framework.filters import SearchFilter

from core.models import Branch
from core.serializers import BranchSerializer


class BranchAutocompleteList(generics.ListAPIView):
    serializer_class = BranchSerializer

    def get_queryset(self):
        q = self.request.query_params.get('q', None)
        return Branch.objects.filter(branch__istartswith=q).order_by('ifsc')


class BranchSearchList(generics.ListAPIView):
    serializer_class = BranchSerializer

    queryset = Branch.objects.all().order_by('ifsc')

    filter_backends = [SearchFilter]
    search_fields = ['bank__name', 'ifsc', 'branch', 'state', 'city', 'district', '@address']


class BranchRetrieve(generics.RetrieveAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
