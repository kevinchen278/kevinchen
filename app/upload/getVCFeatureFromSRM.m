function [vcFea] = getVCFeatureFromSRM(fea, vcType)

% fea parameter refer to the feature generated with the codes from SRM. 
load mapping;

s_mapping = g.(['s' vcType]);
m_mapping = g.(['m' vcType]);

aFields = fields(fea);

for i=1:length(aFields)
    if (strfind(aFields{i},'minmax') > 0)
        vcFea.(aFields{i}) = getMappingFeature(fea.(aFields{i}), m_mapping);
    else
        spamFea1 = fea.(aFields{i})(:,1:169);
        spamFea2 = fea.(aFields{i})(:,170:338);
        
        vcFea.(aFields{i}) = [getMappingFeature(spamFea1, s_mapping), getMappingFeature(spamFea2, s_mapping)]; 
    end;
end;


function mFea = getMappingFeature(fea, mapping)

[sampleNum,feaNum] = size(fea);

mFea = zeros(sampleNum, mapping.Num);
for k = 1:feaNum
    mFea(:, mapping.table(k)) = mFea(:, mapping.table(k)) + fea(:, k);
end;




    
            
            



