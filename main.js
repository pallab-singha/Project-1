var db = new Dexie("movies-database")
db.version(1).stores({movies : 'bookID,title,authors,average_rating,isbn,language_code,ratings_count,price'})

$.ajax({
    type: 'GET',
    url: 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json',
    dataType: 'json',
    success: function(movies) {
    //   console.log(movieList);
      for(var i=0; i<movies.length; i++){
        db.open()
        db.movies.put({
            bookID: movies[i].bookID,
            title: movies[i].title,
            authors: movies[i].authors,
            average_rating: movies[i].average_rating,
            isbn: movies[i].isbn,
            language_code: movies[i].language_code,
            ratings_count: movies[i].ratings_count,
            price: movies[i].price
        });
      }
    }
});