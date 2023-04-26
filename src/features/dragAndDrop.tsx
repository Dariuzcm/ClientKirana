import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";

export default function DragAndDrop() {
  
  const [updating, setState] = useState<boolean>(false);

  const handleChange = (file: any) => {
    
  }
  const handleToogleDrop = () => {
    setState(!updating);
    toast('Hello Toast');
  }

  return (
    <>
      {updating ? <>
        <FileUploader handleChange={handleChange} name="file" types={['CVS']} />
        <Button onClick={handleToogleDrop}>Cancel</Button>
      </>
        : <Button onClick={handleToogleDrop}>Update CVS</Button>}

    </>
  )
}