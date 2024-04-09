'use client'
import React from 'react'
interface AdminEditProps {
comment: any;
onSave: (postId: string, editedContent: string) => Promise<void>;
onCancel: () => void;
}
export default function EditCommentModal({ comment,  onCancel }: AdminEditProps) {
   

  return (
    <div>EditCommentModal</div>
  )
}
