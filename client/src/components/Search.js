import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';


function Search({onSearch}) {
  return (
    <Container className="mb-4">
      <Form>
        <div className='searchbar'>
          <label htmlFor='search'>Search Dogs:</label>
          <input
            type="text"
            id="search"
            placeholder="Type name to search"
            onChange={onSearch}
          />
        </div>
        </Form>
    </Container>
  );
}

export default Search;


