import { useEffect, useState } from "react";
import { Switch } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';



interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
  const { sdk } = props;
  
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk.window]);
  
  const [isActive, setActive] = useState(props.sdk.field.getValue() || false);  

  return (
    <Switch
      {...props}
      id={props.sdk.field.id}
      labelText="Background" 
      isChecked={isActive}
      onToggle={(e) => { 
        setActive(e); 
        sdk.field.setValue(e);
        let field = sdk.editor.editorInterface.controls?.find(c => c.fieldId === "field");                                      
        console.log(field);
        // hide or show corresponding field
      }}
    />
  );
};

export default Field;
