// src/components/Card.js
export const Card = ({ children }) => {
    return <div className="p-4 bg-gray-800 rounded-lg shadow">{children}</div>;
  };
  
  export const CardContent = ({ children }) => {
    return <div className="p-2">{children}</div>;
  };
  