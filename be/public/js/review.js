const input = document.getElementsByClassName("review__rating-stars--input");
const ratingStars = [...document.getElementsByClassName("review__rating-stars--star")];
let rating=0;
function executeRating(stars) {
  const starClassActive = "review__rating-stars--star fas fa-star";
  const starClassInactive = "review__rating-stars--star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);
      if (star.className===starClassInactive) {
        rating=i+1;
        console.log(rating);
        for (i;i>=0;i--) stars[i].className = starClassActive;
      } else {
        rating=i;
        console.log(rating);
        for (i;i<starsLength;i++) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);