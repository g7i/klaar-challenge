from django.db import models


class Bank(models.Model):
    name = models.CharField(max_length=49, blank=True, null=True)
    id = models.BigIntegerField(primary_key=True, unique=True)

    class Meta:
        managed = True
        db_table = 'banks'

    def __str__(self):
        return self.name


class Branch(models.Model):
    ifsc = models.CharField(primary_key=True, max_length=11, unique=True)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, blank=True, null=True)
    branch = models.CharField(max_length=74, blank=True, null=True)
    address = models.CharField(max_length=195, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    district = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=26, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'branches'
        verbose_name_plural = 'branches'

    def __str__(self):
        return f'{self.ifsc} - {self.branch}'
