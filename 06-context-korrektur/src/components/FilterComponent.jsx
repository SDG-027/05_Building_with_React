const FilterComponent = ({ setFilter }) => {
  const setFilterInView = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => setFilterInView('all')}
        className="rounded bg-gray-200 px-3 py-1 text-gray-900"
      >
        All
      </button>
      <button
        onClick={() => setFilterInView('active')}
        className="rounded bg-gray-200 px-3 py-1 text-gray-900"
      >
        Active
      </button>
      <button
        onClick={() => setFilterInView('completed')}
        className="rounded bg-gray-200 px-3 py-1 text-gray-900"
      >
        Completed
      </button>
    </div>
  );
};

export default FilterComponent;
