const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
);

export default FeatureCard