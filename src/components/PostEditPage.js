import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import imageImg from '../assets/image.svg';
import TurndownService from 'turndown';
import { useNavigate, useParams } from 'react-router-dom';
import { useError } from './ErrorContext';
import { createPost, getPostById, updatePost } from '../api/postApi';
import { marked } from 'marked';

const PostEditor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { showError } = useError();
  const [title, setTitle] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'post-image',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'outline-none w-full h-full min-h-[200px]',
      },
    },
  });

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        const post = await getPostById(postId); 
        setTitle(post.title);
        editor?.commands.setContent(marked(post.body));
      } catch (err) {
        showError(err.response?.data.message || 'Failed to load the post.');
        navigate('/');
      }
    };

    fetchPostData();
  }, [postId]);


  const toggleBold = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  }, [editor]);

  const toggleItalic = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event) => {
      if (!event.target.files?.length) return;
      
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (editor && e.target?.result) {
          editor
            .chain()
            .focus()
            .setImage({ src: e.target.result.toString() })
            .run();
        }
      };
      
      reader.readAsDataURL(file);
    };
    
    input.click();
  }, [editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const turndownService = new TurndownService();
    const htmlContent = editor?.getHTML();
    const body = turndownService.turndown(htmlContent);

    try {
      let newPostId;
      if(postId === undefined) {
        newPostId = await createPost(title, body);
      } else {
        newPostId = await updatePost(postId, title, body);
      }
      navigate(`/posts/${newPostId}`)
    } catch (err) {
     
      const errorMessage = Array.isArray(err.response?.data.message)
        ? err.response.data.message[0] 
        : err.response?.data.message || "Failed to create post.";
    
      showError(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center text-2xl font-kanit mb-8">Post editor</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-kanit">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-kanit">Body</label>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-2 space-x-2">
              <button
                type="button"
                onClick={toggleBold}
                className={`px-2 py-1 rounded focus:outline-none ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
              >
                B
              </button>
              <button
                type="button"
                onClick={toggleItalic}
                className={`px-2 py-1 rounded focus:outline-none ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
              >
                I
              </button>
              <button
                type="button"
                onClick={addImage}
                className="px-2 py-1 rounded focus:outline-none"
              >
              <img
                src={imageImg}
                alt='image'
                className="h-3 w-3"
              />
              </button>
            </div>
            <div 
              className="editor-wrapper cursor-text" 
              onClick={() => editor?.chain().focus().run()}
            >
              <EditorContent 
                editor={editor} 
                className="p-3"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-white font-kanit text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>

      <style jsx global>{`
        .ProseMirror {
          outline: none !important;
          min-height: 200px;
          height: 100%;
          width: 100%;
        }
        .ProseMirror p {
          margin: 0;
        }
        .editor-wrapper {
          min-height: 200px;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default PostEditor;