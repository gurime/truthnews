'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import { BeatLoader } from 'react-spinners';
import { auth } from '../firebase/firebase';

interface Comment {
id: string;
userId: string | undefined;
content: string;
timestamp: Date;
userName: string | null | undefined;
userEmail: string | null | undefined;
}

interface CommentFormProps {
articleId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
const [content, setContent] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);
const [comments, setComments] = useState<Comment[]>([]);
const [successMessage, setSuccessMessage] = useState<string>("");
const [names, setNames] = useState<string[]>([]);
const [autoFocus, setAutoFocus] = useState<boolean>(true);
const [errorMessage, setErrorMessage] = useState<string>('');
const router = useRouter();
useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
const getUserData = async (userId: string) => {
try {
const db = getFirestore();
const userDocRef = doc(db, 'users', userId);
const userDocSnapshot = await getDoc(userDocRef);
if (userDocSnapshot.exists()) {
const userData = userDocSnapshot.data();
return userData;
} else {
return null;
}
} catch (error) {
throw error;
}
};
setIsSignedIn(!!user);
if (user) {
try {
const userData = await getUserData(user.uid);
if (userData) {
setNames([userData.firstName, userData.lastName]);
}
} catch (error: any) {
handleError(error);
} finally {
setIsLoading(false);
}
}
});
return () => unsubscribe();
}, []);

const handleError = (error: { code: string }) => {
if (error.code === 'network-error') {
setErrorMessage('Network error: Please check your internet connection.');
} else if (error.code === 'invalid-content') {
setErrorMessage('Invalid comment content. Please try again.');
} else {
setErrorMessage('Unexpected error occurred. Please try again later.');
}
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const db = getFirestore();
const docRef = await addDoc(collection(db, 'comments'), {
articleId: articleId,
userId: user?.uid,
content: content,
timestamp: new Date(),
userName: user?.displayName,
userEmail: user?.email,
});
setComments((prevComments) => [...prevComments,
{
id: docRef.id,
userId: user?.uid,
content: content,
timestamp: new Date(),
userName: user?.displayName,
userEmail: user?.email,
},
]);
setSuccessMessage('Comment created successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
setContent('');
} catch (error) {
setErrorMessage('Error submitting comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
} finally {
setIsLoading(false);
}
};

const handleLogout = async () => {
try {
await auth.signOut();
router.push('/pages/Login')
} catch (error) {
console.error(error);
}
};

  return (
    <>
<form className="postform" onSubmit={handleSubmit}>
{isSignedIn ? (
<div className="commentreg-box">
{names.length === 2 && (
<>
<div className='navinfo-box'>
<span className="navinfo">{names[0]}</span>
<span className="navinfo">{names[1]}</span>
</div>
</>
)}
<button
style={{
width: 'auto',
marginBottom: '4px',
}}
type="button"
onClick={handleLogout}
>
Log out
</button>
</div>
) : (
<div className="commentreg-box">
<button
style={{
backgroundColor: 'blue',
width: 'auto',
margin: '10px',
}}
onClick={() => router.push('/pages/Login')}>
Login
</button>

<button
style={{
margin: '10px',
width: 'auto',
}}
onClick={() => router.push('/pages/Register')}>
Register
</button>
</div>
)}
{/* post form start here here */}
<textarea
rows={5}
cols={50}
placeholder='Type Your Message'
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}></textarea>

<button
className={isSignedIn ? "submitbtn" : "submitbtn disabled"}
type="submit"
disabled={!isSignedIn || !content || isLoading}>
{isLoading ? <BeatLoader color='blue' /> : 'Comment'}
</button>
</form>
<CommentList comments={comments} setComments={setComments} articleId={articleId} />
</>
)
}

export default CommentForm;