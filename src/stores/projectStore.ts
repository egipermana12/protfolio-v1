import { defineStore } from 'pinia'
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export const useProjectStroe = defineStore('project', {
	state: () => ({
		projects: []
	}),
	actions: {
		async fetchProject() {
			const querySnapshot = await getDocs(collection(db, 'projects'))
			this.projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		},
	}
});