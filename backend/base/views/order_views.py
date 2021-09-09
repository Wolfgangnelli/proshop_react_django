from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Order, OrderItem, ShippingAddress, Product
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        message = {'details': 'No Order Items'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = ['shippingPrice'],
            totalPrice = data['totalPrice']
        )
        # 2. Create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )
        # 3. Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                order = order,
                product = product,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )
            # 4. Update stock of the correspond product
            product.countInStock -= item.qty
            product.save()

    # 5. Serialize my order, shipping to turn it in json data so i can send it to React app
    serializer = OrderSerializer(order, many=False)
    
    return Response(serializer.data)
