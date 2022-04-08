import { ref } from 'vue';
import { db, marcTime } from '@/firebase';
import { useAuth } from '@vueuse/firebase';

export const useDb = () => {
    const refer = db.collection('todo');
    const chargin = ref(false);
    const { user } = useAuth();

    const getTodo = async () => {
        try {
            chargin.value = true;
            const res = await refer
                .where('uid', '==', user.value.uid)
                .get();
            return res.docs.map((item) => ({
                id: item.id,
                ...item.data(),
            }));
        } catch (error) {
            return {
                error,
                res: true,
            };
        } finally {
            chargin.value = false;
        }
    };

    const addTodo = async (text) => {
        try {
            const todo = {
                text: text,
                date: marcTime(),
                state: false,
                uid: user.value.uid,
            };

            const res = await refer.add(todo);

            return {
                id: res.id,
                ...todo,
            };
        } catch (error) {
            console.log(error);
        }
    };

    const delTodo = async (id) => {
        try {
            await refer.doc(id).delete();
            return {
                res: false,
            };
        } catch (error) {
            return {
                error,
                res: true,
            };
        }
    };

    const modTodo = async (todo) => {
        try {
            await refer.doc(todo.id).update({
                state: !todo.state,
            });

            return {
                res: false,
            };
        } catch (error) {
            return {
                error,
                res: true,
            };
        }
    };

    return { getTodo, addTodo, chargin, delTodo, modTodo };
};
