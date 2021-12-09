import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import MovieSlider from "../../components/slider/MovieSlider";
// import BookingTool from '../components/BookingTool';
// import MoviesList from '../components/MoviesList';
import News from "../../components/news/News";
import BlockApp from "../../components/blockApp/BlockApp";
import Footer from "../../components/footer/Footer";

// import { useDispatch } from 'react-redux';
// import {
//   getMovieListNowShowingAction,
//   getMovieListUpComingAction,
// } from '../store/actions/movieAction';
// import Cinema from '../components/Cinema';
// import { getCinemaListAction } from '../store/actions/cinemaAction';

export default function HomePage() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMovieListNowShowingAction());
  // }, []);
  // useEffect(() => {
  //   dispatch(getMovieListUpComingAction());
  // }, []);
  // useEffect(() => {
  //   dispatch(getCinemaListAction());
  // }, [dispatch]);
  return (
    <>
      <Header />
      <MovieSlider />
      {/* <BookingTool /> */}
      {/* <MoviesList /> */}
      {/* <Cinema /> */}
      <News />
      <BlockApp />
      <Footer />
    </>
  );
}
