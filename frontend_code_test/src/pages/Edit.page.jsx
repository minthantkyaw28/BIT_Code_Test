
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";


const EditPage = () => {

  const navigate=useNavigate();

   const { idx } = useParams();

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

   const [bookname, setBookname] = useState("");
   const [bookUniqueId, setBookUniqueId] = useState("");
   const [coverphoto, setCoverphoto] = useState("");


   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`http://localhost:8888/books/${idx}`);
         const result = await response.json();
         setData(result);
         setBookname(result.bookname);
         setCoverphoto(result.cover_photo);
         setBookUniqueId(result.book_uniq_idx);
       } catch (error) {
         console.error("Error fetching data:", error);
       } finally {
         setLoading(false);
       }
     };

     fetchData();
   }, []);


   const handleBookNameChange = (e) => {
     setBookname(e.target.value);
   };

   const handleBookUniqueIdChange = (e) => {
     setBookUniqueId(e.target.value);
   };

   const handleCoverPhotoChange = (e) => {
     setCoverphoto(e.target.value);
   };


       const handleSubmit = async (e) => {
         e.preventDefault();

         try {
           const response = await fetch("http://localhost:8888/books", {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               idx:idx,
               book_uniq_idx:bookUniqueId,
               bookname:bookname,
               cover_photo:coverphoto,
             }),
           });

           if (response.ok) {
             console.log("Form submitted successfully!");
            navigate("/");
  
             // You can handle success, such as resetting the form or navigating to a new page
           } else {
             console.error("Failed to submit form:", response.statusText);
           }
         } catch (error) {
           console.error("Error submitting form:", error);
         }
       };


  return (
    <>
      <div className="text-xl text-red-600">Edit page</div>
      {/* <p>{idx}</p>
      <p>{data.bookname}</p>
      <p>{data.book_uniq_idx}</p>
      <p>{data.cover_photo}</p> */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="textInput"
              className="block text-sm font-medium text-gray-700"
            >
              Book Name:
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={bookname}
              onChange={handleBookNameChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="textInput"
              className="block text-sm font-medium text-gray-700"
            >
              Book Unique ID:
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={bookUniqueId}
              onChange={handleBookUniqueIdChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="textInput"
              className="block text-sm font-medium text-gray-700"
            >
              Book Cover Photo Url:
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={coverphoto}
              onChange={handleCoverPhotoChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Edit
          </button>
        </form>
      )}
    </>
  );
}

export default EditPage