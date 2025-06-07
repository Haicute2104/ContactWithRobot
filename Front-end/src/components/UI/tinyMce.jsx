import { Editor } from '@tinymce/tinymce-react';

function MyEditor({ value, onChange }) {
  return (
    <Editor
      apiKey='7rt0dv17qw6vfwwa8zc0q7k51ij368g60pniv75vl6m2z7m5'
      value={value}
      onEditorChange={onChange}
      init={{
        height: 300,
        menubar: false,
        plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
    />
  );
}

export default MyEditor;
