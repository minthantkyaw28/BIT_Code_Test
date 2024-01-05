import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const CreatePage = () => {

     const navigate = useNavigate();

      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [loading, setLoading] = useState(true);
      const [selectedAuthor, setSelectedAuthor] = useState("");
       const [selectedPublisher, setSelectedPublisher] = useState("");
       const [textInput, setTextInput] = useState("");
       const [photoInput, setPhotoInput] = useState("");
       const [bookUniqueIdInput, setBookUniqueIdInput] = useState("");

       useEffect(() => {
         const fetchData = async () => {
           try {
             const response = await fetch(
               "http://localhost:8888/authors_publishers"
             );
             const result = await response.json();
            setData1(result.authors_result);
            setData2(result.publishers_result);

             // Set a default selected option if needed
             if (result.length > 0) {
            //    setSelectedAuthor(result[0].id);
            //     setSelectedPublisher(result[0].id);
             }
           } catch (error) {
             console.error("Error fetching data:", error);
           } finally {
             setLoading(false);
           }
         };

         fetchData();
       }, []);
      
    //    console.log(selectedAuthor);
    //    console.log(selectedPublisher);
      const handleInputChange = (e) => {
        setTextInput(e.target.value);
      };

         const handleBookIdChange = (e) => {
           setBookUniqueIdInput(e.target.value);
         };

            const handlePhotoChange = (e) => {
              setPhotoInput(e.target.value);
            };

       const handleSubmit = async (e) => {
         e.preventDefault();

         try {
           const response = await fetch("http://localhost:8888/books", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               book_uniq_idx:bookUniqueIdInput,
               bookname:textInput,
               content_owner_id:selectedAuthor,
               publisher_id:selectedPublisher,
               cover_photo:photoInput,
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
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Create a Book Form Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="options"
            className="block text-sm font-medium text-gray-700"
          >
            Select Author
          </label>
          <select
            id="options"
            name="options"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          >
            <option selected>Pick Author Name</option>
            {data1.map((item) => (
              <option key={item.idx} value={item.idx}>
                {item.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="options"
            className="block text-sm font-medium text-gray-700"
          >
            Select Publisher
          </label>
          <select
            id="options"
            name="options"
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          >
            <option selected>Pick Publisher Name</option>
            {data2.map((item) => (
              <option key={item.idx} value={item.idx}>
                {item.name}
              </option>
            ))}
          </select>

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
              value={textInput}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="textInput"
              className="block text-sm font-medium text-gray-700"
            >
              Book Cover
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={photoInput}
              onChange={handlePhotoChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="textInput"
              className="block text-sm font-medium text-gray-700"
            >
              Book Unique Id
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={bookUniqueIdInput}
              onChange={handleBookIdChange}
              className="mt-1 p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      )}

      <Link to={"/"}>
        <button className="my-6 text-red-600 text-lg px-2 py-2 bg-black">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default CreatePage;
