const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB connect with Prisma ORM
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Welcome Endpoint
app.get("/", async function (req, res) {
    return res.json({ msg:"Welcome to WZ Book API" });
});

//Single book Endpoint 
app.get("/books/:idx", async function (req, res) {
   const { idx } = req.params;
   if (!idx)
     return res.status(400).json({ msg: "Require Something To get A Book" });

   const id = parseInt(idx);

  try {
    const result = await prisma.tbl_book.findUnique({
      where: { idx: id },
    });
    if (result) {
      return res.json(result);
    } else {
      return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});


//List of all books Endpoint
app.get("/books", async function (req, res) {
    try {
        const result = await prisma.tbl_book.findMany({
          include: {
            content_owner: {
              select: {
                name: true,
              },
            },
            publisher: {
              select: {
                name: true,
              },
            },
          },
        });
         if (result) {
           return res.json(result);
         } else {
           return res
             .status(400)
             .json({ msg: "Something Wrong Try Again !!!" });
         }
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

//Create a book Endpoint
app.post("/books", async function (req, res) {
    const {
      book_uniq_idx,
      bookname,
      content_owner_id,
      publisher_id,
      cover_photo,
    } = req.body;

    if(!book_uniq_idx || !bookname || !content_owner_id || !publisher_id || !cover_photo) {
         return res
           .status(400)
           .json({ msg: "Require Something To Create A Book" });
    }

    let Content_Owner_Id = parseInt(content_owner_id);
    let Publisher_Id = parseInt(publisher_id);

    try {
        const result = await prisma.tbl_book.create({
          data: {
            book_uniq_idx,
            bookname,
            content_owner_id: Content_Owner_Id,
            publisher_id: Publisher_Id,
            cover_photo,
          },
        });

        if(result){
            return res
              .status(201)
              .json({ msg: "Book Created Successfully !!!" });
        }else{
            return res
              .status(400)
              .json({ msg: "Something Wrong Try Again !!!" });
        }

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

//Delete a book Endpoint
app.delete("/books/:idx", async function (req, res) {
     const { idx } = req.params;
     if(!idx)  return res.status(400).json({ msg: "Require Something To Delete A Book" });

     const id=parseInt(idx);

     try {
        const result = await prisma.tbl_book.delete({
          where: {
            idx: id,
          },
        });
        if (result) {
          return res.json({ msg: "Book Deleted Successfully !!!" });
        } else {
          return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
        }
     } catch (error) {
         return res.status(400).json({ msg: error.message });
     }
});

//Edit a book Endpoint
app.put("/books", async function (req, res) {
    const {
      idx,
      book_uniq_idx,
      bookname,
      cover_photo,
    } = req.body;
    if (
      !idx ||
      !book_uniq_idx ||
      !bookname ||
      !cover_photo
    )
      return res
        .status(400)
        .json({ msg: "Require Something To Create A Book" });

         const id = parseInt(idx);

    try {
      const result = await prisma.tbl_book.update({
        where: {
          idx: id,
        },
        data: {
          bookname: bookname,
          cover_photo: cover_photo,
          book_uniq_idx: book_uniq_idx,
        },
      });
      if (result) {
        return res.json({ msg: "Book Deleted Successfully !!!" });
      } else {
        return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
      }
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
});

//List of authors and publishers Endpoint
app.get("/authors_publishers", async function (req, res) {
    //  try {
       const authors_result = await prisma.content_owner.findMany();
       const publishers_result = await prisma.publisher.findMany();

       console.log(authors_result);
       console.log(publishers_result);

       if (authors_result && publishers_result) {
         return res.status(200).json({ authors_result, publishers_result });
       } else {
         return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
       }
    //  } catch (error) {
    //    return res.status(400).json({ msg: error.message });
    //  }
});

//Create a content_owner
app.post("/content_owner", async function (req, res) {
  const { name } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ msg: "Name Require To Create A Content Owner" });

  try {
    const result = await prisma.content_owner.create({ data: req.body });
    if (result) {
      return res
        .status(201)
        .json({ msg: "Content Owner Created Successfully !!!" });
    } else {
      return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

//Create a publisher
app.post("/publisher", async function (req, res) {
  const { name } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ msg: "Name Require To Create A Publisher Owner" });

  try {
    const result = await prisma.publisher.create({ data: req.body });
    if (result) {
      return res
        .status(201)
        .json({ msg: "Publisher Created Successfully !!!" });
    } else {
      return res.status(400).json({ msg: "Something Wrong Try Again !!!" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

app.listen(8888, () => {
  console.log("API server running at http://localhost:8888");
});