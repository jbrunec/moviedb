import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

const Filter = () => {
  return (
    <div className="p-4 w-full">
      <div>Genre</div>
      <div>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="one">one</ToggleGroupItem>
          <ToggleGroupItem value="two">two</ToggleGroupItem>
          <ToggleGroupItem value="three">three</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default Filter;
