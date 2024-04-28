import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Input
        {...{
          icon: faMagnifyingGlass,
          type: 'text',
          className: 'search-input',
        }}
      />
    </div>
  );
};

export default SearchBar;
