import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Item from './Item/Item'
import Post from './Posts/Post'
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./App.Styles";
// Types
import { PostVoteType } from "./Types/post.type";
export type CartItemType ={
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();
const getAllPosts = async (): Promise<PostVoteType[]> =>
  await (await fetch('https://fastapi8000.herokuapp.com/posts')).json();

const App = () => {
  const [cartIsOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(['products'], getProducts);

  //const { data, isLoading, error } = useQuery<PostVoteType[]>(['posts'], getAllPosts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handlePost = (selectedPost: PostVoteType) => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartIsOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true) }>
        <Badge badgeContent={getTotalItems(cartItems)}color = 'error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

  
  {/* //
    <Grid container spacing={3}>
      {data?.map((post: PostVoteType) => (
        <Grid item key={post.posting?.id} xs={12} sm={4}>
          <Post post={post} handlePost={handlePost} />
        </Grid>
      ))}
    </Grid> */}

    </Wrapper>
  );
}

export default App;
