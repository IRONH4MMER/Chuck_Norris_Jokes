import useFetchData from './utils/useFetchData';
import { Endpoints } from './types';
import { ButtonGroup } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

function App() {
  const randomJoke = useFetchData<Response>(Endpoints.random);
  const categories = useFetchData<Response>(Endpoints.categories);
  const handleClick = () => {
    return useFetchData(Endpoints.randomByCategory + categories.data[0]);
  };

  return (
    <>
      <img src="../public/ChuckImg.png" />
      <p>{randomJoke.data.value}</p>
      <ButtonGroup variant="text" aria-label="Basic button group">
        {categories.data.map(category => (
          <LoadingButton key={category} loading={categories.isLoading}>
            {category}
          </LoadingButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default App;
