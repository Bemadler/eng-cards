import React, { useState } from 'react';

const DeleteButton = ({ onDelete, wordId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(wordId);
    } catch (error) {
      console.error('Ошибка при удалении слова:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Удаление...' : 'Удалить'}
    </button>
  );
};

export default DeleteButton;
