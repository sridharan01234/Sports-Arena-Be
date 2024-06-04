import { Component } from '@angular/core';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent {
  products = [
    {
      product_id: 1,
      name: 'Hockey Stick',
      imageurl: '../../assets/images/shampoo.jpg',
      description:' Made up with Solid Wood material attractive and durable  Attractive, durable and high grip to use Ideal for kids, men, women',
      price:400,
    size:"1",
    quantity:1
  },
  {
  product_id: 2,
  name: 'Shoe',
  imageurl: '../../assets/images/shoe.jpg',
  description:
  'Elite Design: The Bacca Bucci BluePulse Elite Series offers a striking deep blue colorway, symbolizing the vastness of the sky and the depth of the ocean, designed for players who command the field.',
  price:1200,
  size:"1",
  quantity:1
  },
  {
  product_id: 3,
  name: 'Ball',
  imageurl: '../../assets/images/ball1.jpg',
  description:'GREAT GIFT IDEA: This combo include of Bat Ball, Hockey & Racket and makes a perfect gift for birthdays, holidays and other gift-giving occasions. Both boys and girls will entertain themselves. ',
  price:400,
  size:"300",
  quantity:1
  }
  
  ];
}
