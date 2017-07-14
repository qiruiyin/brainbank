// 0 游客
// 1 商业思维
// 2 系统思维
// 大于2 思维商学院
const headerBtns = [
	{
		level: 0,
		course: '普通学员',
		btns: [
			{
				value: '',
				name: '我要报名',
				link: 'register'
			}
		]
	},{
		level: 1,
		course: '商业思维',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'upgrade',
				name: '升级',
				link: 'upgrade'
			}
		]
	},{
		level: 2,
		course: '系统思维',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'upgrade',
				name: '升级',
				link: 'upgrade'
			}
		]
	},{
		level: 3,
		course: '思维商学院',
		btns: [
			{
				value: 'retrain',
				name: '复训',
				link: 'retrain'
			},{
				value: 'takeCourse',
				name: '参加课程',
				link: 'pay'
			}
		]
	},
];

export default  headerBtns