from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User

@receiver(pre_save, sender=User)
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

# pre_save.connect(updateUser, sender=User)


        
