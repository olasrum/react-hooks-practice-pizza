import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectPizza, setSelectPizza] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
    .then((r) => r.json())
    .then((pizzas) => setPizzas(pizzas))
  }, [])

  function handleChangeForm(name, value) {
    setSelectPizza({...selectPizza, [name]: value,})
  }

  function handleEditPizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) => 
    pizza.id === updatedPizza.id ? updatedPizza : pizza);
    setSelectPizza(updatedPizza)
    setPizzas(updatedPizzas);
  }

  return (
    <>
      <Header />
      <PizzaForm 
        pizza={selectPizza}
        onChangeForm={handleChangeForm}
        onEditPizza={handleEditPizza}
      />
      <PizzaList pizzas={pizzas} onSelectPizza={setSelectPizza}/>
    </>
  );
}

export default App;
