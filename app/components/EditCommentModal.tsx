'use client'
import React, { useState } from 'react'
interface AdminEditProps {
comment: any;
onSave: (postId: string, editedContent: string) => Promise<void>;
onCancel: () => void;
}
export default function EditCommentModal({ comment, onSave,  onCancel }: AdminEditProps) {
const [editedContent, setEditedContent] = useState<string>(comment ? comment.content : '');
const handleSave = () => {onSave(comment.id, editedContent);};

return (
<>
<div style={{ position: 'relative' }}>
<div className="edit-comment-modal">
<div className="modal-content">
<div className="modal-header">Edit Comment</div>
<textarea
value={editedContent}
onChange={(e) => setEditedContent(e.target.value)}
className="modal-textarea"
rows={10} 
/>
<div className="modal-buttons">
<button onClick={handleSave} className="edit-btn">Save</button>
<button onClick={onCancel} className="delete-btn">Cancel</button>
</div>
</div>
</div>
</div>
</>
)
}
