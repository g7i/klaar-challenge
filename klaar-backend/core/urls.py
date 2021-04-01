from django.urls import path

from . import views

urlpatterns = [
    path('', views.BranchSearchList.as_view()),
    path('autocomplete', views.BranchAutocompleteList.as_view()),
    path('<str:pk>', views.BranchRetrieve.as_view()),
]
