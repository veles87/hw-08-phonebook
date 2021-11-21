//Styles
import css from './AddContactForm.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
//Components
import { FormItems } from 'Components/FormItems/FormItems';
import { SubmitButton } from 'Components/SubmitButton/SubmitButton';
//Utils
import { contactSchema } from 'utils/validtionSchema';
import { hasName } from 'utils/hasName';
import { contactFormOptions } from 'utils/formikOptions';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
//Fetch servises
import {
  useAddContactMutation,
  useGetContactQuery,
} from 'redux/contactApiServise';
import { useCurrentQuery } from 'redux/authServise';

const AddContactForm = () => {
  const { data } = useGetContactQuery();
  const { refetch } = useCurrentQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  useEffect(() => {
    refetch(); //re-fetch user name of userBar component
  }, [data, refetch]);

  function onSubmit(event, actions) {
    if (hasName(event.name, data)) {
      toast.error('Такой контакт уже есть');
    } else {
      addContact({
        ...event,
      })
        .then(toast.success('Добавлено'))
        .catch(error =>
          toast.error(
            `Возникла ошибка ${error.status}, сообщение ${error.data}`,
          ),
        );
    }
    actions.resetForm();
  }

  return (
    <>
      <h1 className={css.header}>Phonebook</h1>
      <FormItems
        schema={contactSchema}
        onSubmit={onSubmit}
        initValues={{ name: '', number: '' }}
        inputTags={contactFormOptions}
      >
        <SubmitButton label={'add'} isLoading={isLoading} width={'45px'} />
      </FormItems>
    </>
  );
};

export default AddContactForm;
