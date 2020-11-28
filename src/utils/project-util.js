import { cityListAPI } from '@/api/city'
import { workgroupListAPI } from '@/api/workgroup'
import { dictItemListAPI } from '@/api/dict'
import { RESP_CODE } from '@/utils/response-code'

export const PROJECT_CONST = {
  PROJECT_TYPE_KEY: 'project_type',
  COMPANY_TYPE_KEY: 'company_type',
  PROJECT_STATE_KEY: 'project_state'
}

const workGroupSet = {}
getWorkGroupOptions(data => {
  for (var i = 0; i < data.length; i++) {
    const groupObj = data[i]
    workGroupSet[groupObj.groupKey] = groupObj.groupName
  }
})
/**
 * 预处理api返回的project对象 list
 * @param {*} projectList
 */
export function formatProjectList(projectList) {
  if (!projectList || projectList.length === 0) {
    return projectList
  }
  const newList = []
  for (var j = 0; j < projectList.length; j++) {
    const project = formatProject(projectList[j])

    newList.push(project)
  }
  return newList
}
/**
 * 预处理api返回的project对象
 * @param {*} projectObj
 */
export function formatProject(projectObj) {
  // 时间格式
  const timeItems = ['projectSubmitTime',
    'subregOpinionTime',
    'nifaDistributeTime',
    'nifaOpinionTime',
    'regOpinionTime',
    'deleteTime']
  for (var i = 0; i < timeItems.length; i++) {
    const itemName = timeItems[i]
    if (projectObj[itemName]) {
      projectObj[itemName] = projectObj[itemName].slice(0, 10)
    }
  }
  // 工作组
  projectObj.nifaGroupName = workGroupSet[projectObj.nifaGroupKey]
  return projectObj
}
/**
 * 获取一个空的project对象
 */
export function getEmptyProjectItem() {
  return {
    projectNifaId: '', // 自律id
    projectName: '', // 项目名称
    projectTechnology: '', // 关键技术
    projectDescription: '', // 描述
    projectCity: '', // 所属城市
    projectType: '', // 项目类型
    projectState: '', // 项目状态
    projectRegulationId: '', // 监管id
    projectSubmitTime: '', // 申报时间
    projectNote: '', // 备注

    companyName: '', // 单位名称
    companyType: '', // 机构类型
    companyContact: '', // 机构联系人
    companyContactInfo: '', // 联系方式

    subregContact: '', // 分行联系人
    subregContactInfo: '', // 分行联系方式
    subregOpinion: '', // 分行意见
    subregOpinionTime: '', // 分行审核时间

    nifaGroupKey: '', // 自律组织工作组
    nifaDistributeTime: '', // 分配时间
    nifaContact: '', // 联系人
    nifaContactInfo: '', // 联系方式
    nifaOpinion: '', // 自律审核意见
    nifaOpinionTime: '', // 自律审核时间

    regContact: '', // 总行联系人
    regContactInfo: '', // 总行联系方式
    regOpinion: '', // 总行意见
    regOpinionTime: '' // 总行审核时间

  }
}
/**
 * 项目类型列表
 */
export function getProjectTypeOptions(callback) {
  dictItemListAPI({ 'dictypeKey': PROJECT_CONST.PROJECT_TYPE_KEY }).then(res => {
    if (res.code === RESP_CODE.OK) {
      callback(res.data)
    } else {
      console.log('查询异常：' + res.code)
    }
  }).catch(() => {
    this.$message.error('查询失败，稍后再试')
  })
}

/**
 * 申报机构类型列表
 */
export function getCompanyTypeOptions(callback) {
  dictItemListAPI({ 'dictypeKey': PROJECT_CONST.COMPANY_TYPE_KEY }).then(res => {
    if (res.code === RESP_CODE.OK) {
      callback(res.data)
    } else {
      console.log('查询异常：' + res.code)
    }
  }).catch(() => {
    this.$message.error('查询失败，稍后再试')
  })
}

/**
 * 工作组列表
 */

export function getWorkGroupOptions(callback) {
  workgroupListAPI().then(res => {
    if (res.code === RESP_CODE.OK) {
      callback(res.data)
    } else {
      console.log('查询工作组异常：' + res.code)
    }
  }).catch(() => {
    this.$message.error('查询工作组失败，稍后再试')
  })
}

/**
 * 试点城市列表
 */

export function getCityOptions(callback) {
  cityListAPI().then(res => {
    if (res.code === RESP_CODE.OK) {
      callback(res.data)
    } else {
      console.log('查询city异常：' + res.code)
    }
  }).catch(() => {
    this.$message.error('查询city失败，稍后再试')
  })
}

/**
 * 项目状态列表
 */
export function getProjectStateOptions(callback) {
  dictItemListAPI({ 'dictypeKey': PROJECT_CONST.PROJECT_STATE_KEY }).then(res => {
    if (res.code === RESP_CODE.OK) {
      callback(res.data)
    } else {
      console.log('查询异常：' + res.code)
    }
  }).catch(() => {
    this.$message.error('查询失败，稍后再试')
  })
}
