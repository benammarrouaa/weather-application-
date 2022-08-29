import { render, screen } from '@testing-library/react';
import CitySearchComponent from './components/CitySearchComponent';
import App from './App';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
test('renders the landing page', () => {
  render(<App />);
  //expect(screen.getByRole("AsyncPaginate")).toHaveDisplayValue("Enter a city");
  
});

