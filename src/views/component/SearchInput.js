import React from 'react';
import styled from 'react-emotion';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

const InputGroupAddonCustom = styled(InputGroupAddon)({
  '& .input-group-text' : {
    backgroundColor: '#fff',
    borderRadius: '0px',
    '& .fas': {
      color: '#186fa4'
    }
  }
}); 

const SearchInput = () => {
  return (
    <InputGroup style={{ marginBottom: '12px'}} >
      <InputGroupAddonCustom addonType="prepend"><span className="input-group-text"><i className="fas fa-search"></i></span></InputGroupAddonCustom>
      <Input placeholder="Search..." />
    </InputGroup>
  )
}
 
export default SearchInput;

