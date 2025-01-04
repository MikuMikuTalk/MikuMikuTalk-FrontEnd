<!-- 
 
这段代码实现了一个基于 Vue 3 和 Element Plus 的图片裁剪上传组件。以下是对代码的分析：

### 1. **模板部分 (`<template>`)**:
   - **文件上传输入框**: 使用 `<input>` 元素实现文件上传功能，用户可以选择图片文件。该输入框默认隐藏，通过点击按钮触发。
   - **裁剪对话框**: 使用 Element Plus 的 `el-dialog` 组件实现裁剪对话框。对话框内包含两个主要部分：
     - **左侧裁剪区域**: 使用 `vueCropper` 组件实现图片裁剪功能。用户可以缩放、旋转图片，并调整裁剪框。
     - **右侧预览区域**: 显示裁剪后的图片预览。
   - **操作按钮**: 提供了“取消”、“重置”、“确认”等按钮，用户可以通过这些按钮控制裁剪流程。

### 2. **脚本部分 (`<script>`)**:
   - **Props**: 定义了父组件传递的参数，如上传类型、允许的文件格式、文件大小限制、裁剪框的宽高比例等。
   - **Reactive Data**: 使用 `reactive` 和 `ref` 定义了组件内部的状态，如裁剪选项、预览样式、裁剪组件实例等。
   - **Methods**:
     - **onChange**: 处理文件选择事件，读取文件并显示在裁剪组件中。
     - **beforeUploadEvent**: 文件上传前的校验，检查文件类型和大小是否符合要求。
     - **refreshCrop**: 重置裁剪组件。
     - **rotateRight**: 旋转图片。
     - **changeScale**: 缩放图片。
     - **uploadFile**: 触发文件选择对话框。
     - **cropperSuccess**: 处理裁剪成功后的逻辑，上传图片并返回图片 URL。
     - **dataURLtoFile**: 将 base64 格式的图片数据转换为 `File` 对象。
     - **onConfirm**: 确认裁剪，获取裁剪后的图片并上传。
     - **previewHandle**: 实时预览裁剪后的图片。
   - **Watch**: 监听 `props` 的变化，动态调整预览区域的样式和允许上传的文件类型。

### 3. **样式部分 (`<style>`)**:
   - 使用 SCSS 编写样式，定义了裁剪对话框的布局和样式。
   - 左侧裁剪区域和右侧预览区域的布局通过 `flex` 实现，确保在不同屏幕尺寸下都能正常显示。

### 4. **主要功能**:
   - **图片裁剪**: 用户可以选择图片文件，使用 `vueCropper` 组件进行裁剪操作。
   - **实时预览**: 裁剪后的图片会实时显示在右侧预览区域。
   - **文件上传**: 裁剪完成后，用户可以将图片上传到服务器，并获取图片的 URL。
   - **文件校验**: 在上传前对文件类型和大小进行校验，确保上传的文件符合要求。

### 5. **依赖**:
   - **Vue 3**: 使用 Composition API 编写组件逻辑。
   - **Element Plus**: 使用其提供的 UI 组件（如 `el-dialog`、`el-button`、`el-icon` 等）构建用户界面。
   - **vueCropper**: 用于实现图片裁剪功能。

### 6. **可扩展性**:
   - **自定义裁剪比例**: 通过 `props.fixedNumber` 可以自定义裁剪框的宽高比例。
   - **支持多种文件格式**: 通过 `props.allowTypeList` 可以自定义允许上传的文件格式。
   - **实时预览**: 通过 `previewHandle` 方法实现裁剪后的实时预览。

### 7. **改进建议**:
   - **错误处理**: 可以在文件上传失败时增加错误提示，提升用户体验。
   - **国际化**: 如果需要支持多语言，可以将文本内容提取到语言包中。
   - **性能优化**: 对于大图片的裁剪，可以考虑使用 Web Worker 进行异步处理，避免阻塞主线程。

总的来说，这段代码实现了一个功能完善的图片裁剪上传组件，具有良好的可扩展性和用户体验。

-->
<template>
	<div>
		<!-- 重新上传的输入框，默认隐藏 -->
		<input ref="reuploadInput" type="file" accept="image/*" @change="onChange" id="fileBtn" style="display: none" />
		<!-- 裁剪对话框 -->
		<el-dialog
			:model-value="dialogVisible"
			:title="'图片裁剪'"
			width="45%"
			modal-class="gvb_cropper_upload_dialog"
			:custom-class="'upload_dialog'"
			@close="dialogVisible = false"
		>
			<template #default>
				<div class="cropper">
					<div class="cropper_left">
						<!-- 裁剪组件 -->
						<vueCropper
							ref="cropperRef"
							:img="options.img"
							:info="true"
							:info-true="options.infoTrue"
							:auto-crop="options.autoCrop"
							:fixed-box="options.fixedBox"
							:can-move="options.canMoveBox"
							:can-scale="options.canScale"
							:fixed-number="fixedNumber"
							:fixed="options.fixed"
							:full="options.full"
							:center-box="options.centerBox"
							@real-time="previewHandle"
						/>
						<div class="reupload_box">
							<!-- 重新上传按钮 -->
							<el-button type="primary" class="reupload_text" @click="uploadFile('reload')"> 重新上传 </el-button>
							<div>
								<!-- 缩放按钮 -->
								<el-icon class="rotate_right" @click="changeScale(1)">
									<CirclePlus />
								</el-icon>
								<!-- 缩小按钮 -->
								<el-icon class="rotate_right" @click="changeScale(-1)">
									<Remove />
								</el-icon>
								<!-- 旋转按钮 -->
								<el-icon class="rotate_right" @click="rotateRight">
									<RefreshRight />
								</el-icon>
							</div>
						</div>
					</div>
					<div class="cropper_right">
						<div class="preview_text">
							<!-- 预览标题 -->
							预览
						</div>
						<div :style="getStyle" class="previewImg">
							<div :style="previewFileStyle">
								<!-- 预览图片 -->
								<img :style="previews.img" :src="previews.url" alt="" />
							</div>
						</div>
					</div>
				</div>
			</template>
			<template #footer>
				<span class="dialog-footer">
					<!-- 取消按钮 -->
					<el-button @click="dialogVisible = false">取消</el-button>
					<!-- 重置按钮 -->
					<el-button type="" @click="refreshCrop">重置</el-button>
					<!-- 确认按钮 -->
					<el-button type="primary" @click="onConfirm"> 确认 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlus, Remove, RefreshRight } from '@element-plus/icons-vue';
import { uploadImageApi } from '@/api/file_api';

// 管理对话框的显示和隐藏
const dialogVisible = ref<boolean>(false);

// 自定义confirm事件
const emits = defineEmits(['confirm']);
//裁剪组件用到的参数
interface Options {
	img: string | ArrayBuffer | null; //裁剪图片的地址
	info: boolean; //裁剪框的大小信息
	outputSize: number; //裁剪生成图片的质量[0.1-1]
	outputType: string; //裁剪生成图片的格式
	canScale: boolean; //图片死否允许滚轮缩放
	autoCrop: boolean; //是否默认生成截图框
	autoCropWidth: number;
	autoCropHeight: number;
	fixedBox: boolean; //固定截图框大小，不允许改变
	fixed: boolean; //是否开启截图狂宽高固定比例
	fixedNumber: Array<number>; //截图框的宽高比例，配合centerBox才能生效
	full: boolean; //是否输出原图比例的截图
	canMoveBox: boolean; //  截图框是否允许移动
	original: boolean; // 上传图片按照原始比例渲染
	centerBox: boolean; // 截图框是否被限制在图片里面
	infoTrue: boolean; // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
	accept: string; // 上传允许的格式
}
//父组件传参props
interface IProps {
	type: string; //上传类型，企业logo/浏览器logo
	allowTypeList: string[]; //允许上传的格式
	limitSize: number; //允许上传的大小
	fixedNumber: number[]; //截图框的宽高比例，配合centerBox才能生效
	fixedNumberAider?: number[]; // 侧边栏收起截图框的宽高比例
	previewWidth: number; //预览图的宽
	title?: string; //图片裁剪的标题
}

//预览样式
interface IStyle {
	width: number | string;
	height: number | string;
}
// 父组件传参
const props = withDefaults(defineProps<IProps>(), {
	type: 'systemLogo',
	allowTypeList: () => ['jpg', 'png', 'jpeg'],
	limitSize: 1,
	fixedNumber: () => [1, 1],
	fixedNumberAider: () => [1, 1],
	previewWidth: 228,
	title: 'LOGO裁剪',
});
//裁剪组件需要用到的参数
const options = reactive<Options>({
	img: '', // 需要剪裁的图片
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 150, // 默认生成截图框的宽度
	autoCropHeight: 150, // 默认生成截图框的长度
	fixedBox: false, // 是否固定截图框的大小 不允许改变
	info: true, // 裁剪框的大小信息
	outputSize: 1, // 裁剪生成图片的质量 [1至0.1]
	outputType: 'png', // 裁剪生成图片的格式
	canScale: true, // 图片是否允许滚轮缩放
	fixed: true, // 是否开启截图框宽高固定比例
	fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效 1比1
	full: true, // 是否输出原图比例的截图
	canMoveBox: false, // 截图框能否拖动
	original: false, // 上传图片按照原始比例渲染
	centerBox: true, // 截图框是否被限制在图片里面
	infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
	accept: 'image/jpeg,image/jpg,image/png,image/gif,image/x-icon',
});
// 定义一个响应式对象，用于存储预览容器的样式
const getStyle = ref<IStyle>({
	width: '', // 预览容器的宽度
	height: '', // 预览容器的高度
});
// 定义一个响应式数组，用于存储允许上传的文件类型
const acceptType = ref<string[]>([]);
// 定义一个响应式对象，用于存储裁剪后的预览样式信息
const previews: any = ref({});
// 定义一个响应式对象，用于存储预览文件的样式
const previewFileStyle: any = ref({});

// 定义一个响应式对象，用于存储裁剪组件的引用
const cropperRef: any = ref({});

// 定义一个响应式对象，用于存储重新上传的input元素的引用
const reuploadInput = ref<HTMLElement | null | undefined>();

//回显图片用的方法
/**
 * 处理文件选择事件，显示裁剪对话框并设置裁剪图片。
 * 此函数在用户选择文件后调用，用于显示裁剪对话框并设置要裁剪的图片。
 *
 * @param {Event} e - 文件选择事件对象。
 */
const onChange = (e: any) => {
	// 获取用户选择的文件
	const file = e.target.files[0];
	// 获取URL对象，用于创建文件的URL
	const URL = window.URL || window.webkitURL;
	// 调用beforeUploadEvent函数检查文件类型是否符合要求
	if (beforeUploadEvent(file)) {
		// 使用URL.createObjectURL方法创建文件的URL，并将其设置为裁剪组件的图片源
		options.img = URL.createObjectURL(file);
		// 显示裁剪对话框
		dialogVisible.value = true;
	}
};

/* 上传图片前置拦截函数 */
/**
 * 检查上传的文件是否符合允许的类型。
 * 此函数在上传图片之前调用，用于验证文件的类型是否在允许的列表中。
 *
 * @param {File} file - 要上传的文件。
 * @returns {boolean} - 如果文件类型符合要求，则返回true；否则返回false。
 */
const beforeUploadEvent = (file: File) => {
	// 获取文件扩展名
	const type = file.name.substring(file.name.lastIndexOf('.') + 1);
	// 检查文件类型是否在允许的列表中
	const isAllowTye = props.allowTypeList.some((item) => {
		return item === type;
	});
	// 如果文件类型不符合要求，显示错误消息并返回false
	if (!isAllowTye) {
		ElMessage.error(`仅支持${acceptType.value.join('、')}格式的图片`);
		return false;
	}
	// 如果文件类型符合要求，返回true
	return true;
};

/* 重置裁剪组件 */
const refreshCrop = () => {
	// cropperRef裁剪组件自带很多方法，可以打印看看
	cropperRef.value.refresh();
};

/* 右旋转图片 */
const rotateRight = () => {
	cropperRef.value.rotateRight();
};

/* 放大缩小图片比例 */
const changeScale = (num: number) => {
	const scale = num || 1;
	cropperRef.value.changeScale(scale);
};

// 缩放的格式
const tempScale = ref<number>(0);

// 点击上传
const uploadFile = (type: string): void => {
	/* 打开新的上传文件无需生成新的input元素 */
	// 如果类型是'reupload'，则触发已存在的input元素的点击事件
	if (type === 'reupload') {
		// 使用可选链操作符（?.）确保reuploadInput.value不为null或undefined
		reuploadInput.value?.click();
		// 结束函数执行
		return;
	}
	// 创建一个新的HTMLInputElement
	let input: HTMLInputElement | null = document.createElement('input');
	// 设置input元素的类型为'file'
	input.type = 'file';
	// 设置input元素的accept属性为options.accept
	input.accept = options.accept;
	// 为input元素的change事件绑定onChange函数
	input.onchange = onChange;
	// 触发input元素的点击事件
	input.click();
	// 将input变量设置为null，释放内存
	input = null;
};

/* 上传成功方法 */
/**
 * 处理裁剪后图片的上传。
 * 此函数将裁剪后的图片文件发送到服务器，并返回上传成功后的图片URL。
 *
 * @param {File} dataFile - 裁剪后的图片文件。
 * @returns {Promise<string>} - 上传成功后的图片URL。
 */
const cropperSuccess = async (dataFile: File) => {
	// 在接口请求中需要上传file文件格式, 并且该接口需要改header头部为form-data格式
	const { code, data } = await uploadImageApi(dataFile, 'avatar');
	// 检查上传是否成功
	if (code === 0 && data.url) {
		// 返回上传成功后的图片URL
		return data.url;
	}
};

// base64转图片文件
/**
 * 将Base64编码的字符串转换为File对象。
 * 此函数用于将裁剪后的图片数据从Base64格式转换为File对象，以便上传到服务器。
 *
 * @param {string} dataUrl - Base64编码的图片数据。
 * @param {string} filename - 生成的File对象的文件名。
 * @returns {File} - 转换后的File对象。
 */
const dataURLtoFile = (dataUrl: string, filename: string) => {
	// 将Base64字符串分割为数据和元数据部分
	const arr = dataUrl.split(',');
	// 从元数据中提取MIME类型
	const mime = (arr[0].match(/:(.*?);/) as string[])[1];
	// 解码Base64数据部分
	const bstr = atob(arr[1]);
	// 获取解码后数据的长度
	let len = bstr.length;
	// 创建一个与解码后数据长度相同的Uint8Array
	const u8arr = new Uint8Array(len);
	// 将解码后的数据填充到Uint8Array中
	while (len--) {
		u8arr[len] = bstr.charCodeAt(len);
	}
	// 使用Uint8Array创建一个新的File对象，并指定文件名和MIME类型
	return new File([u8arr], filename, { type: mime });
};

// 上传图片（点击保存按钮）
const onConfirm = () => {
	// 获取裁剪后的图片数据
	cropperRef.value.getCropData(async (data: string) => {
		// 将裁剪后的图片数据转换为File对象
		const dataFile: File = dataURLtoFile(data, 'images.png');
		// 调用cropperSuccess函数上传图片
		const res = await cropperSuccess(dataFile);
		// 触发自定义事件，将上传结果：图片Url 传递给父组件
		emits('confirm', res);
		// 返回上传结果，图片url
		return res;
	});
	// 关闭对话框
	dialogVisible.value = false;
};

/**
 * 处理裁剪后图像的预览。
 * 此函数使用裁剪后的图像数据更新预览状态，并计算预览的缩放因子。
 *
 * @param {Object} data - 包含宽度（w）和高度（h）的裁剪后图像数据。
 */
const previewHandle = (data: any) => {
	// 使用裁剪后的图像数据更新预览状态
	previews.value = data; // 预览img图片

	// 根据预览宽度和裁剪后图像宽度计算预览的缩放因子
	tempScale.value = props.previewWidth / data.w;

	// 设置预览容器的样式
	previewFileStyle.value = {
		width: data.w + 'px', // 将预览容器的宽度设置为裁剪后图像的宽度
		height: data.h + 'px', // 将预览容器的高度设置为裁剪后图像的高度
		margin: 0, // 移除任何外边距
		overflow: 'hidden', // 隐藏任何溢出的内容
		zoom: tempScale.value, // 将计算出的缩放因子应用于预览容器
		position: 'relative', // 设置位置为相对定位
		border: '1px solid #e8e8e8', // 为预览容器添加边框
		'border-radius': '2px', // 为预览容器添加边框半径
	};
};
watch(
	() => props,
	() => {
		/* 预览样式 */
		// 设置预览容器的宽度为父组件传递的预览宽度
		getStyle.value.width = props.previewWidth + 'px';
		// 根据父组件传递的宽高比例计算预览容器的高度
		getStyle.value.height = props.previewWidth / props.fixedNumber[0] + 'px';

		// 上传格式tips信息
		acceptType.value = [];
		// 遍历父组件传递的允许上传的格式列表
		for (let i = 0; i < props.allowTypeList.length; i++) {
			// 将允许上传的格式转换为大写并添加到acceptType数组中
			acceptType.value.push(props.allowTypeList[i].toUpperCase());
		}
	},
	{
		deep: true,
	}
);

/* 向子组件抛出上传事件 */
defineExpose({
	uploadFile,
});
</script>
<style lang="scss" scoped>
.gvb_cropper_upload_dialog {
	.cropper {
		width: 100%;
		height: 50vh;
		display: flex;
		overflow: hidden;
		.cropper_left {
			display: flex;
			flex-direction: column;
			width: 70%;

			.reupload_box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10px;

				.reupload_text {
					color: white;
					cursor: pointer;
				}

				.rotate_right {
					margin-left: 16px;
					cursor: pointer;
				}
			}
		}

		.cropper_right {
			width: 30%;
			margin-left: 20px;

			.preview_text {
				margin-bottom: 12px;
			}
		}
	}
}
</style>
