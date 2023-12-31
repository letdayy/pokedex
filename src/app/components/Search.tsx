import React, { ReactElement, useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input, Label } from 'reactstrap';

interface SearchProps {
  filteredPokemon: (searchTerm: string) => void;
}

export default function Search({ filteredPokemon }: SearchProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    setSearchTerm(inputValue);
    filteredPokemon(inputValue);
  };

  return (
    <>

  <Form>
    <FormGroup floating style={{ width: '80%', margin: '30px 10px' }}>
      <Input label='Search' value={searchTerm} onChange={handleInputChange}
      name='Search'
      placeholder='Search'
      />
      <Label for="exampleEmail">
        Search
      </Label>
    </FormGroup>
    {' '}
  </Form>
</>
  );
}

