import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from "./db";

export const home = (req, res) => {
  res.render("movies", { movies: getMovies(), pageTitle: "Movies" });
};

export const movieDetail = (req, res) => {
  const {
    params: { id },
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404");
  } else {
    res.render("detail", { movie, pageTitle: movie.title });
  }
};

export const filterMovie = (req, res) => {
  const {
    query: { year, rating },
  } = req;
  if (year) {
    const searchYear = getMovieByMinimumYear(year);
    res.render("movies", {
      searchYear,
      pageTitle: `Searching by Year: ${year}`,
    });
  } else if (rating) {
    const searchRating = getMovieByMinimumRating(rating);
    res.render("movies", {
      searchRating,
      pateTitle: `Searching by Rating: ${rating}`,
    });
  } else {
    res.redirect("404");
  }
};
