import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const ListPage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await fetch("http://localhost:8888/books");
           const result = await response.json();
           setData(result);
         } catch (error) {
           console.error("Error fetching data:", error);
         } finally {
           setLoading(false);
         }
       };

       fetchData();
     }, []);

        const handleDelete = async (idx) => {
       try {
         const response = await fetch(`http://localhost:8888/books/${idx}`, {
           method: "DELETE",
        
         });

         if (response.ok) {
           console.log(`Item with ID ${idx} deleted successfully!`);
           location.reload();
           // You can update the UI or perform additional actions after deletion
         } else {
           console.error(
             `Failed to delete item with ID ${idx}:`,
             response.statusText
           );
         }
       } catch (error) {
         console.error("Error deleting item:", error);
       }
     };

  return (
    <>
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">WZ BOOK API</h1>
        <Link to={"/create"}>
          <button className="my-6 text-red-600 text-lg px-2 py-2 bg-black">
            Add New Book
          </button>
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-2">Unique ID</th>
                <th className="border-b p-2">Book Name</th>
                <th className="border-b p-2">Content Owner</th>
                <th className="border-b p-2">Publisher</th>
                <th className="border-b p-2">Created Date</th>
                <th className="border-b p-2">Edit</th>
                <th className="border-b p-2">Delete</th>
                {/* Add more headers based on your API response structure */}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.idx}>
                  <td className="border-b p-2">{item.book_uniq_idx}</td>
                  <td className="border-b p-2">{item.bookname}</td>

                  <td className="border-b p-2">{item.content_owner.name}</td>
                  <td className="border-b p-2">{item.publisher.name}</td>
                  <td className="border-b p-2">{item.createdAt}</td>

                  <td className="border-b p-2">
                    <Link to={`/edit/${item.idx}`}>Edit</Link>
                  </td>

                  <td className="border-b p-2">
                    <button onClick={() => handleDelete(item.idx)}>
                      Delete
                    </button>
                  </td>
                  {/* Add more cells based on your API response structure */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ListPage;
