'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, getDocs, getFirestore, doc, query, orderBy, where, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import EditCommentModal from './EditCommentModal';

interface Comment {
id: string;
userId: string | undefined;
content: string;
timestamp: Date;
userName: string | null | undefined;
userEmail: string | null | undefined;
}

interface CommentListProps {
comments: Comment[];
setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
articleId: string;
}

const CommentList: React.FC<CommentListProps> = (props) => {
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(true);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState<Comment | null>(null);
const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
const { comments, setComments, articleId } = props;
const commentsRef = useRef<HTMLDivElement | null>(null);

const fetchComments = async (articleId: string) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'comments');
const queryRef = query(
commentsRef,
where(`articleId`, '==', articleId),
orderBy('timestamp', 'desc')
);
const querySnapshot = await getDocs(queryRef);
const newComments: Comment[] = querySnapshot.docs.map((doc) => {
const commentData = doc.data();
return {
id: doc.id,
userId: commentData.userId,
content: commentData.content,
timestamp: commentData.timestamp.toDate(),
userName: commentData.userName,
userEmail: commentData.userEmail,
};
});
setComments(newComments);
setLoading(false);
} catch (error) {
console.error('Error fetching comments:', error); 
setErrorMessage('Error fetching comments. Please try again.');
setLoading(false);
}
};

const userIsAuthenticated = async () => {
return new Promise<boolean>((resolve) => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
const isAuthenticated = !!user;
resolve(isAuthenticated);
});
});
};

const editPost = (postId: string, userId: string | undefined) => {
const commentToEdit = comments.find((comment) => comment.id === postId);
if (commentToEdit) {
const auth = getAuth();
const currentUser = auth.currentUser;
if (currentUser && currentUser.uid === commentToEdit.userId) {
setEditingComment(commentToEdit);
setEditModalOpen(true);
} else {
setErrorMessage('Unauthorized to edit this comment.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setErrorMessage('Comment not found');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};

const handleEditModalSave = async (postId: string, editedContent: string) => {
try {
await updateComment(postId, editedContent);
setEditModalOpen(false);
} catch (error) {
setErrorMessage('Error saving comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};

const handleEditModalCancel = () => {
setEditModalOpen(false);
};

const updateComment = async (postId: string, editedContent: string) => {
try {
const db = getFirestore();
const commentRef = doc(db, 'comments', postId);await updateDoc(commentRef, {
content: editedContent,
});
setComments((prevComments) =>
prevComments.map((comment) => (comment.id === postId ? { ...comment, content: editedContent } : comment))
);
setSuccessMessage('Comment updated successfully');
setTimeout(() => {
setSuccessMessage(undefined);
}, 3000);
} catch (error) {
setErrorMessage('Error updating comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};

const deletePost = async (postId: string, commentUserId: string | undefined) => {
try {
const auth = getAuth();
const currentUser = auth.currentUser;
const isAuthenticated = await userIsAuthenticated();
if (currentUser) {
if (currentUser.uid === commentUserId) {
const db = getFirestore();
const commentDoc = await getDoc(doc(db, 'comments', postId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, 'comments', postId));
setComments((prevComments) => prevComments.filter((comment) => comment.id !== postId));
setSuccessMessage('Comment deleted successfully');
setTimeout(() => {
setSuccessMessage(undefined);
}, 3000);
} else {
setErrorMessage('Comment not found');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setErrorMessage('Unauthorized to delete this comment.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
}
} catch (error) {
setErrorMessage('Error deleting comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};

useEffect(() => {
setComments([]); // Reset comments to empty array
fetchComments(articleId);
}, [articleId]);

return (
<>
   
{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
<div ref={commentsRef} className="post-list">
{comments.map((comment, index) => (
<div key={`${comment.id}-${index}`} className="post-item">
<h2 className="postuser-username">{comment.userName}</h2>
<div className="bodyBlock">{comment.content}</div>
<div className="date-block">
<span className="momentDate">
{comment.timestamp instanceof Date
? comment.timestamp.toLocaleString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric',
hour: 'numeric',
minute: '2-digit',
hour12: true,
}): comment.timestamp}
</span>
</div>
<div className="edit-delBlock">
<button className="edit-btn" onClick={() => editPost(comment.id, comment.userId)} type="button">
Edit
</button>
<button className="delete-btn" onClick={() => deletePost(comment.id, comment.userId)} type="button">
Delete
</button>
</div>
</div>
))}
</div>

<div style={{ display: 'flex', placeContent: 'center' }}>
{loading && <BeatLoader color="blue" loading={loading} />}
</div>   
{editModalOpen && <EditCommentModal comment={editingComment} onSave={handleEditModalSave} onCancel={handleEditModalCancel} />}
</>
);
};

export default CommentList;