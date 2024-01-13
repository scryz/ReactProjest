import "../../css/AddEvent.css"
import Navbar from "../navbar/Navbar";
import Footer from "../body/Footer";
const AddEvent = () => {

  

return (
    <>
        <Navbar />
<div className="container">
    <h1>Добавление мероприятий</h1>
    <form>
      <label htmlFor="name">Название:</label>
      <input type="text" id="name" name="name" required />
      
      <label htmlFor="time">Дата и время события:</label>
      <input type="datetime-local" id="time" name="time" required />
      
      <label htmlFor="description">Подробное описание:</label>
      <textarea id="description" name="description" rows="4" cols="50" required></textarea>
      
      <button type="submit">Добавить мероприятие</button>
    </form>
 </div>
 <Footer />
        </>
 );
 }
 export default AddEvent;