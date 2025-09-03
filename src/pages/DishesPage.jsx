import Navbar from "../components/Navbar";

function DishesPage({ foods }) {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          All Dishes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {food.name}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{food.description}</p>
                <p className="text-green-700 font-bold mt-3">{food.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DishesPage;
