import { Button } from "@material-ui/core";
// Types
import { PostVoteType } from "../Types/post.type";
// Styles
import {Wrapper} from '../Item/Item.styles'

type Props = {
    post: PostVoteType;
    handlePost: (selectedPost: PostVoteType) => void;
}

const Post: React.FC<Props> = ({ post, handlePost }) => (
    <Wrapper>
        <div>
            <p>title{post?.posting?.title}</p>
        </div>
        <div>
            <p>inhalt{post?.posting?.content}</p>
            <p>erstellt{post?.posting?.created_at}</p>
        </div>
        <Button onClick={() => handlePost(post)}>Read Post</Button>
    </Wrapper>
)

export default Post;